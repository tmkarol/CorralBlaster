CSS3 FEATURES:

1.

2.

3.

OTHER COOL & DIFFICULT FEATURES:

-Drawing/Implementing the Hexagon Grid
		We found that this is much harder than implementing a regular square grid. We didn't have much luck finding
		information online about this, so for the most part we had to figure out the math for drawing and logic with
		the game board ourselves. This involved a lot of geometry. Additionally, since rows are offset from each other,
		we found we had to keep track of all hexes in a single array rather than a 2D array, like you would with rectangles.

-JavaScript Classes
		To implement the game board, we also had to learn how to use JavaScript classes to keep track of each hexagon,
		its location, and its shape. For reference on this, we looked at example code on how to make abnormal shape classes
		(jsfiddle.net/m1erickson/wPMk5/). While this example code did not tell us explicitly how to make hexagons or draw them
		in a grid, it gave us a good starting point for the logic of drawing and detecting clicks in multiple abnormal shapes.

-New Funcitons
		To make our game flow more smoothly, we also looked into other, new JavaScript functions, such as timeout(). Timeout 
		allowed us to pause the JavaScript for a set amount of time. We used this so that Blaster would not take his turn 
		instantly after the player, but would instead wait a moment so it looked more like playing against another human.

// Other things we did


// TODO:
- Blaster logic (better than random?)
- 3 CSS3 features
- Write out README file
- Instructions
