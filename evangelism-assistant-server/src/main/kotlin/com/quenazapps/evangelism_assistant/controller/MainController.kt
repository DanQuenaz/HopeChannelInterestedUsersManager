package com.quenazapps.evangelism_assistant.controller

import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController

@RestController
@RequestMapping("/main")
class MainController {

    @GetMapping("/hello")
    fun sayHello(): String {
        return "Hello World!"
    }
}