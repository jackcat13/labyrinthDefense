package com.jackcat13.resources
import com.jackcat13.dto.PlayerCreateDto
import com.jackcat13.service.PlayerService
import javax.inject.Inject
import javax.ws.rs.*
import javax.ws.rs.core.MediaType
import javax.ws.rs.core.Response

@Path("/players")
@Produces(MediaType.APPLICATION_JSON)
class PlayerResource() {

    @Inject
    lateinit var playerService: PlayerService;

    @GET
    fun authenticate(@QueryParam("username") username: String) = Response.ok(playerService.authenticate(username)).build()

    @POST
    @Consumes(MediaType.APPLICATION_JSON)
    fun subscribe(player: PlayerCreateDto) = Response.accepted(playerService.createPlayer(player)).build()

}