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
    private String gameId;
    private String gameLabel;
    private Boolean isGameStarted;

    public static List<Game> findGames(){
        return findAll().list();
    }

    public String getGameLabel() {
        return gameLabel;
    }

    public void setGameLabel(String name) {
        this.gameLabel = name;
    }

    @Id
    public String getGameId() {
        return gameId;
    }

    public void setGameId(String gameId) {
        this.gameId = gameId;
    }

    public boolean isGameStarted() {
        return isGameStarted;
    }

    public void setGameStarted(boolean gameStarted) {
        isGameStarted = gameStarted;
    }
}