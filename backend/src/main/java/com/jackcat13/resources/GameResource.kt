package com.jackcat13.resources

import com.jackcat13.dto.GameCreateDto
import com.jackcat13.service.GameService
import javax.inject.Inject
import javax.ws.rs.*
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response

@Path("/games")
@Produces(MediaType.APPLICATION_JSON)
class GameResource() {

    @Inject
    lateinit var gameService: GameService;

    @GET
    fun availableGames() = Response.ok(gameService.availableGames()).build()

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    fun createGame(game: GameCreateDto) = Response.accepted(gameService.createGame(game)).build()

}