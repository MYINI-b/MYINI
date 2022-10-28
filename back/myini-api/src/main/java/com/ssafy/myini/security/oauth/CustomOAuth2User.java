package com.ssafy.myini.security.oauth;

import com.ssafy.myini.member.domain.Member;
import com.ssafy.myini.member.domain.type.Provider;
import com.ssafy.myini.member.domain.type.Role;
import lombok.Data;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.oauth2.core.user.OAuth2User;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@Data
public class CustomOAuth2User implements OAuth2User {

    private Long userId;
    private Provider userProvider;
    private String userProviderId;
    private String userName;
    private String userEmail;
    private Role role;

    private Collection<? extends GrantedAuthority> authorities;
    private Map<String, Object> attributes;

    public CustomOAuth2User(Long userId, Provider userProvider, String userProviderId, String userName, Role role, Collection<? extends GrantedAuthority> authorities,Map<String, Object> attributes) {
        this.userId = userId;
        this.userProvider = userProvider;
        this.userProviderId = userProviderId;
        this.userName = userName;
        this.role = role;
        this.authorities = authorities;
        this.attributes = attributes;
    }

    public static CustomOAuth2User create(Member member, Map<String, Object> attributes) {
        List<GrantedAuthority> authorities = Collections.
                singletonList(new SimpleGrantedAuthority(String.valueOf(member.getRole())));
        CustomOAuth2User customOAuth2User = new CustomOAuth2User(
                member.getMemberId(),
                member.getMemberProvider(),
                member.getMemberProviderId(),
                member.getMemberName(),
                member.getRole(),
                authorities,
                attributes);

        return customOAuth2User;
    }

    @Override
    public Map<String, Object> getAttributes() {
        return attributes;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    @Override
    public String getName() {
        return String.valueOf(userId);
    }
}
