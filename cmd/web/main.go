package main

import (
	"fmt"
	"log"
	"net/http"
	"time"

	"github.com/Dimisz/bed_and_breakfast_app/internal/config"
	"github.com/Dimisz/bed_and_breakfast_app/internal/handlers"
	"github.com/Dimisz/bed_and_breakfast_app/internal/render"
	"github.com/alexedwards/scs/v2"
)

const PORT string = ":8081"

var app config.AppConfig
var session *scs.SessionManager

func main() {

	app.InProduction = false

	session = scs.New()
	session.Lifetime = 24 * time.Hour
	session.Cookie.Persist = true
	session.Cookie.SameSite = http.SameSiteLaxMode
	session.Cookie.Secure = app.InProduction
	app.Session = session

	tc, err := render.CreateTemplateCache()
	if err != nil {
		log.Fatal("cannot create template cache", err)
	}
	app.TemplateCache = tc
	app.UseCache = true

	repo := handlers.CreateNewRepo(&app)
	handlers.SetHandlers(repo)

	render.NewTemplates(&app)

	// http.HandleFunc("/", handlers.Repo.Home)
	// http.HandleFunc("/about", handlers.Repo.About)

	fmt.Printf("Starting a server on the port %s\n", PORT)
	// _ = http.ListenAndServe(PORT, nil)
	srv := &http.Server{
		Addr:    PORT,
		Handler: routes(&app),
	}
	err = srv.ListenAndServe()
	log.Fatal(err)
}
