package com.quenazapps.evangelism_assistant.controller

import com.quenazapps.evangelism_assistant.service.ResponsibleService
import org.slf4j.LoggerFactory
import org.springframework.http.HttpStatus.*
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/responsible")
class ResponsibleController(
    private val service: ResponsibleService
) {

    companion object {
        private val log = LoggerFactory.getLogger(ResponsibleController::class.java)
    }

    @GetMapping("/get-all")
    fun getAll(): ResponseEntity<Any> {
        return try {
            val result = service.findAll()
            ResponseEntity.status(OK).body(result)
        } catch (e: Exception) {
            log.error("Error fetching responsible", e)
            ResponseEntity.status(INTERNAL_SERVER_ERROR)
                .body(mapOf("error" to e.message))
        }
    }
}