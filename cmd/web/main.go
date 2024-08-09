package main

import (
	"fmt"
	"net/http"

	"github.com/Dimisz/bed_and_breakfast_app/pkg/handlers"
)

const PORT string = ":8080"

func main() {
	http.HandleFunc("/", handlers.Home)
	http.HandleFunc("/about", handlers.About)

	fmt.Printf("Starting a server on the port %s\n", PORT)
	_ = http.ListenAndServe(PORT, nil)
}
