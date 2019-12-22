@file:JvmName("PlayerEntityDtoTransformer")
package com.jackcat13.transformer

import com.jackcat13.dto.PlayerCreateDto
import com.jackcat13.entities.Player

@JvmOverloads
fun transformPlayerCreateDtoToPlayerEntity(playerCreateDto: PlayerCreateDto): Player {
    val playerEntity = Player()
    playerEntity.id = playerCreateDto.id
    playerEntity.username = playerCreateDto.username
    playerEntity.avatar = playerCreateDto.avatar
    playerEntity.discriminator = playerCreateDto.discriminator
    playerEntity.locale = playerCreateDto.locale
    playerEntity.mfa_enabled = playerCreateDto.mfa_enabled
    playerEntity.flags = playerCreateDto.flags
    return playerEntity
}