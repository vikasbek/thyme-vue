package com.alovitech.thyme.vue.controllers;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class HomeController {

	Logger logger = LoggerFactory.getLogger(getClass());
	
	@GetMapping("/")
	public String home(Model model) {
		logger.info("home index");
		model.addAttribute("name", "vikas");
		return "index";
	}
	
	@GetMapping("/app")
	public String app(Model model) {
		logger.info("home app");
		model.addAttribute("name", "vikas");
		return "index";
	}
	
}
