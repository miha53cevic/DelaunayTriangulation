window.onload = () => {
    createCanvas(640, 480);

    const triangulation = new Delunay_Triangulation();

    // Array of points that will be added to the Triangulation
    let points = [];

    document.getElementById('canvas').addEventListener('click', () => {
        points.push(MOUSE_POS);

        // Clear screen
        clear('white');

        // Draw Points
        for (let point of points) {
            drawFillRect(point.x - 2.5, point.y - 2.5, 5, 5, 'red');
        }
        
        let triangles = triangulation.RunAlgorithm(points);

        // Draw the triangles
        // TODO - filter the edges and draw them only once
        for (let triangle of triangles) {
            triangle.draw();
            //triangle.drawFill('cyan', true);
            //triangle.drawCircumcircle();
        }

        console.log(`Number of triangles: ${triangles.length}`);
    });
};