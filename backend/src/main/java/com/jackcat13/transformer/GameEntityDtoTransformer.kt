@file:JvmName("GameEntityDtoTransformer")
package com.jackcat13.transformer

import com.jackcat13.dto.GameCreateDto
import com.jackcat13.entities.Game

@JvmOverloads
fun transformGameCreateDtoToGameEntity(gameCreateDto: GameCreateDto): Game {
    val gameEntity = Game()
    gameEntity.gameId = gameCreateDto.gameId
    gameEntity.gameLabel = gameCreateDto.gameLabel
    gameEntity.isGameStarted = gameCreateDto.isGameStarted
    return gameEntity
}