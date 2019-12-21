package com.jackcat13.service;

import com.jackcat13.dto.GameCreateDto;
import com.jackcat13.entities.Game;
import com.jackcat13.transformer.GameEntityDtoTransformer;

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
    public Game createGame(GameCreateDto gameDto){
        Game gameEntity = GameEntityDtoTransformer.transformGameCreateDtoToGameEntity(gameDto);
        em.persist(gameEntity);
        return gameEntity;
    }

    public List<Game> availableGames(){
        return Game.findGames();
    }
}
