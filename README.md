# Carrot-Game

![Carrot-Game-Chrome-2021-01-08-16-10-01](https://user-images.githubusercontent.com/63483751/103986524-3f2da180-51ce-11eb-90de-d2051d090d35.gif)


> Used language

- HTML
- CSS
- JS

> Main functions

- The user has to click all of the carrots in 10 seconds.(Time can be changed.) If the user clicks bug, user loses the game.

> What I've learned

- How to calculate the section's width and height

```
field.getBoundingClientRect(); // get infromation about field's width, height
```

- Use `Math.random()` function to get random numbers.
- Use `classList.add()` and `classList.remove()` to add or remove class in tag.
- When I want to show pop up, I used to use `display:none` but it can change the overall size. There is a substitution method

```
visibility:hidden
visibility:visible
```

- Add music effects

```
const carrotSound=new Audio('file');
carrotSound.play();
carrotSound.pause();
```

- Manipulate target

```
const target=event.target;
target.matches('.className');
target.remove();
```

- Make a timer using setInterval() function. This method calls a function or evaluates an expression at specified intervals ( in milliseconds ).
  Using clearInterval() to stop time.

```
timer = setInterval(() => {
    if (remainingTime <= 0) {
      clearInterval(timer);
      finishGame(false);
      return;
    }
    updateTimerText(--remainingTime);
  }, 1000);
```

