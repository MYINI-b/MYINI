FROM openjdk:17-ea-11-jdk-slim

VOLUME /tmp
COPY build/libs/myini-api-0.0.1-SNAPSHOT.jar myini-api.jar

ENTRYPOINT ["java","-jar","myini-api.jar"]
