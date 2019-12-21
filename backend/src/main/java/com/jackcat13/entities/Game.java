package com.jackcat13.entities;

import io.quarkus.hibernate.orm.panache.PanacheEntity;
import io.quarkus.runtime.annotations.RegisterForReflection;

import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import java.util.List;

@Entity
@RegisterForReflection
public class Game extends PanacheEntity {

    private Long id;
    private String gameId;
    private String gameLabel;

    public static List<Game> findGames(){
        return findAll().list();
    }

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE, generator="giftSeq")
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getGameLabel() {
        return gameLabel;
    }

    public void setGameLabel(String name) {
        this.gameLabel = name;
    }

    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }
}