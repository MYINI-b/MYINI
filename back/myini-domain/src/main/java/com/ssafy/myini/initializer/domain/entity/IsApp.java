package com.ssafy.myini.initializer.domain.entity;

import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Getter
public class IsApp {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "is_app_id")
    private Long isAppId;

    private String isApp;

    public void updateIsApp(String isApp){
        this.isApp = isApp;
    }

}
