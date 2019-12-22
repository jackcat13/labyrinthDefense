package com.jackcat13.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.runtime.annotations.RegisterForReflection;
import org.checkerframework.common.aliasing.qual.Unique;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

@Entity
@RegisterForReflection
public class Player extends PanacheEntity {

    private String id;
    private String username;
    private String avatar;
    private String discriminator;
    private String locale;
    private String mfa_enabled;
    private String flags;

    public static Player findPlayer(String username){
        return find("username", username).firstResult();
    }

    @Id
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    @Unique
    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public String getDiscriminator() {
        return discriminator;
    }

    public void setDiscriminator(String discriminator) {
        this.discriminator = discriminator;
    }

    public String getLocale() {
        return locale;
    }

    public void setLocale(String locale) {
        this.locale = locale;
    }

    public String getMfa_enabled() {
        return mfa_enabled;
    }

    public void setMfa_enabled(String mfa_enabled) {
        this.mfa_enabled = mfa_enabled;
    }

    public String getFlags() {
        return flags;
    }

    public void setFlags(String flags) {
        this.flags = flags;
    }
}