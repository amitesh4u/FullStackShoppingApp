package com.amitesh.shop.adapter.in.rest.web;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/web")
public class RootController {

 @GetMapping("/greeting")
  public String index(){
    return "Greeting!!";
  }

}
