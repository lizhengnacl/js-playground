package main

import "fmt"
import _ "time"
import _ "math"

// Greet 返回一个问候语
func Greet(name string) string {
	if name == "" {
		return "Hello, World!"
	}
	return fmt.Sprintf("Hello, %s!", name)
}

func main() {
	fmt.Println(Greet("Go"))
}
