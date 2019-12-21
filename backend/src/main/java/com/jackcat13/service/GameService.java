package com.jackcat13.service;

import com.jackcat13.dto.GameCreateDto;
import com.jackcat13.entities.Game;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;
import java.util.List;

@ApplicationScoped
public class GameService {

    @Inject
    EntityManager em;

    @Transactional
    public void createGame(GameCreateDto gameDto){
        Game game = new Game();
        game.setGameId(gameDto.getGameId());
        game.setGameLabel(gameDto.getGameLabel());
        em.persist(game);
    }

    public List<Game> availableGames(){
        return Game.findGames();
    }
}
