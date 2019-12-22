package com.jackcat13.dto

import io.quarkus.runtime.annotations.RegisterForReflection

@RegisterForReflection
data class PlayerCreateDto(var id: String = "", var username: String = "", var avatar: String = "", var discriminator: String = "", var locale: String = "", var mfa_enabled: String = "", var flags: String = "")
