package com.ssafy.myini.security.util;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
@RequiredArgsConstructor
public class JwtUtil {

    @Value("${token.secret}")
    private String secretKey;

    //회원 가입할시의 토큰 생성
    public String createToken(int userId, String role, String expirationTime) {
        Date now = new Date();
        return Jwts.builder()
                .setSubject(String.valueOf(userId))
                .claim("ROLE", role)
                .setIssuedAt(now)
                .setExpiration(new Date(now.getTime() + Long.valueOf(expirationTime)))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

    public Long getUserId(String token) {
        String userId = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                .getBody().getSubject();
        return Long.valueOf(userId);
    }

    public String getRole(String token){
        Claims body = Jwts.parser().setSigningKey(secretKey).parseClaimsJws(token)
                .getBody();
        return body.get("ROLE", String.class);
    }

    public String getSubject(String jwtToken) {
        return Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken).getBody().getSubject();
    }

    public boolean isValidToken(String jwtToken) {
        try {
            Jwts.parser().setSigningKey(secretKey).parseClaimsJws(jwtToken);
            return true;
        } catch (Exception e) {
            return false;
        }
    }
}