@file:JvmName("PlayerEntityDtoTransformer")
package com.jackcat13.transformer

import com.jackcat13.dto.PlayerCreateDto
import com.jackcat13.entities.Player

@JvmOverloads
fun transformPlayerCreateDtoToPlayerEntity(playerCreateDto: PlayerCreateDto): Player {
    val playerEntity = Player()
    playerEntity.playerId = playerCreateDto.playerId
    return playerEntity
}