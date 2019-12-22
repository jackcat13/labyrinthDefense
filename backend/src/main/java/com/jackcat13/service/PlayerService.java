package com.jackcat13.service;

import com.jackcat13.dto.PlayerCreateDto;
import com.jackcat13.entities.Player;
import com.jackcat13.transformer.PlayerEntityDtoTransformer;

import javax.enterprise.context.ApplicationScoped;
import javax.inject.Inject;
import javax.persistence.EntityManager;
import javax.transaction.Transactional;

@ApplicationScoped
public class PlayerService {

    @Inject
    EntityManager em;

    @Transactional
    public Player createPlayer(PlayerCreateDto playerDto){
        Player playerEntity = PlayerEntityDtoTransformer.transformPlayerCreateDtoToPlayerEntity(playerDto);
        em.persist(playerEntity);
        return playerEntity;
    }

    public Player authenticate(String username){
        return Player.findPlayer(username);
    }
}
