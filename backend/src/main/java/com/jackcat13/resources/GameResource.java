package com.jackcat13.resources;

import com.jackcat13.dto.GameCreateDto;
import com.jackcat13.entities.Game;
import com.jackcat13.service.GameService;

import javax.inject.Inject;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Path("/game")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class GameResource {

    @Inject
    GameService gameService;

    @GET
    public Response availableGames() {
        return Response.ok(gameService.availableGames()).build();
    }

    @POST
    public void createGame(GameCreateDto game){
        gameService.createGame(game);
    }
}