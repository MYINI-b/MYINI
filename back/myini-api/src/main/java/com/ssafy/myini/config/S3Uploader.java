package com.ssafy.myini.config;

import com.amazonaws.AmazonClientException;
import com.amazonaws.AmazonServiceException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.*;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.io.*;
import java.util.UUID;

@Slf4j
@Component
@RequiredArgsConstructor
public class S3Uploader {

    public static final String MEMBER_PROFILE_URL = "userProfile/";
    public static final String PROJECT_IMAGE_URL = "projectProfile/";
    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    public String bucket;

    public ByteArrayOutputStream downloadFile(String keyName) {
        try {
            S3Object s3object = amazonS3Client.getObject(new GetObjectRequest(bucket, keyName));

            InputStream is = s3object.getObjectContent();
            ByteArrayOutputStream outputStream = new ByteArrayOutputStream();
            int len;
            byte[] buffer = new byte[4096];
            while ((len = is.read(buffer, 0, buffer.length)) != -1) {
                outputStream.write(buffer, 0, len);
            }

            return outputStream;
        } catch (IOException ioException) {
            log.error("IOException: " + ioException.getMessage());
        } catch (AmazonServiceException serviceException) {
            log.info("AmazonServiceException Message:    " + serviceException.getMessage());
            throw serviceException;
        } catch (AmazonClientException clientException) {
            log.info("AmazonClientException Message: " + clientException.getMessage());
            throw clientException;
        }

        return null;
    }

    public String uploadFile(MultipartFile file, String folderName) {
        // forEach ????????? ?????? multipartFile??? ????????? ????????? ????????? fileNameList??? ??????
        String fileName = createFileName(file.getOriginalFilename());
        ObjectMetadata objectMetadata = new ObjectMetadata();
        objectMetadata.setContentLength(file.getSize());
        objectMetadata.setContentType(file.getContentType());

        try (InputStream inputStream = file.getInputStream()) {
            amazonS3Client.putObject(new PutObjectRequest(bucket, folderName + fileName, inputStream, objectMetadata)
                    .withCannedAcl(CannedAccessControlList.PublicRead));
        } catch (IOException e) {
            throw new ResponseStatusException(HttpStatus.INTERNAL_SERVER_ERROR, "?????? ???????????? ??????????????????.");
        }
        return fileName;
    }

    public void deleteFile(String fileName) {
        amazonS3Client.deleteObject(new DeleteObjectRequest(bucket, fileName));
    }

    private String createFileName(String fileName) { // ?????? ?????? ????????? ???, ???????????? ??????????????? ?????? random?????? ????????????.
        return UUID.randomUUID().toString().concat(getFileExtension(fileName));
    }

    private String getFileExtension(String fileName) { // file ????????? ????????? ????????? ???????????? ?????? ???????????? ????????????, ?????? ????????? ???????????? ???????????? ??? ?????? ?????? ?????? .??? ?????? ????????? ?????????????????????.
        try {
            return fileName.substring(fileName.lastIndexOf("."));
        } catch (StringIndexOutOfBoundsException e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "????????? ????????? ??????(" + fileName + ") ?????????.");
        }
    }

}