window.onload = () => {
    createCanvas(640, 480);

    const triangulation = new Delunay_Triangulation();

    let points = [];

    document.getElementById('canvas').addEventListener('click', () => {
        points.push(MOUSE_POS);
        
        clear('white');

        for (let point of points) {
            drawFillRect(point.x - 2.5, point.y - 2.5, 5, 5, 'red');
        }
        
        let triangles = triangulation.RunAlgorithm(points);
        for (let triangle of triangles) {
            triangle.draw();
            //triangle.drawCircumcircle();
        }

        console.log(triangles.length);
    });
};