package com.quenazapps.evangelism_assistant.controller

import com.quenazapps.evangelism_assistant.service.InterestedPersonService
import org.springframework.http.HttpStatus
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import org.slf4j.LoggerFactory
import org.slf4j.Logger
import org.springframework.web.bind.annotation.PutMapping
import org.springframework.web.bind.annotation.RequestBody

@RestController
@RequestMapping("/interested-person")
class InterestedPersonController(
    private val interestedPersonService: InterestedPersonService
) {
    companion object {
        private val log: Logger = LoggerFactory.getLogger(InterestedPersonController::class.java)
    }

    @GetMapping("/get-all")
    fun getBetweenReferenceIds(): ResponseEntity<Any> {
        return try {
            val people = interestedPersonService.findAllDTOs()
            ResponseEntity.status(HttpStatus.OK).body(people)
        } catch (e: Exception) {
            log.error(e.message, e)
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                mapOf("status" to HttpStatus.INTERNAL_SERVER_ERROR.value(), "message" to e.message)
            )
        }
    }

    @PutMapping("/update")
    fun update(@RequestBody data: Map<String, Any>): ResponseEntity<Any> {
        return try {

            val updated = interestedPersonService.update(data)

            if (updated == null) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body(
                    mapOf("error" to "Person not found")
                )
            }

            ResponseEntity.ok(updated.toDTO())

        } catch (e: Exception) {
            log.error("Error updating interested person", e)
            ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(
                mapOf("error" to e.message)
            )
        }
    }
}