package com.jackcat13.dto

import io.quarkus.runtime.annotations.RegisterForReflection

@RegisterForReflection
data class PlayerCreateDto(var playerId: String = "")