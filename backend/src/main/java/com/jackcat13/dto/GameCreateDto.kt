package com.jackcat13.dto

import io.quarkus.runtime.annotations.RegisterForReflection

@RegisterForReflection
data class GameCreateDto(var gameId: String = "", var gameLabel: String = "")