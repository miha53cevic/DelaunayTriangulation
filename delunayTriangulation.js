class Delunay_Triangulation {
    constructor() {
        // Create the super triangle
        this.super_triangle = new TriangleMesh();
        const p1 = new Point(0, HEIGHT);
        const p2 = new Point(WIDTH, HEIGHT);
        const p3 = new Point(WIDTH / 2, 0);
        this.super_triangle.createFromPoints(p1, p2, p3);
        this.super_triangle.draw();
    }

    RunAlgorithm(pointList) {
        this.super_triangle.draw();

        // pointList is a set of coordinates defining the points to be triangulated
        // triangulation := empty triangle mesh data structure
        let triangulation = [];
        // add super-triangle to triangulation
        triangulation.push(this.super_triangle);
        // for each point in pointList do // add all the points one at a time to the triangulation
        for (let point of pointList) {
            let badTriangles = [];
            // for each triangle in triangulation do // first find all the triangles that are no longer valid due to the insertion
            for (let triangle of triangulation) {
                if (triangle.isPointInCircumcircle(point)) {
                    // add triangle to badTriangles
                    badTriangles.push(triangle);
                    triangle.badTriangle = true;
                }
            }

            let polygon = [];

            for (let badTriangle of badTriangles) {
                const edges = [badTriangle.a, badTriangle.b, badTriangle.c];

                for (let edge of edges) {
                    let shared = false;

                    for (let badTriangle2 of badTriangles) {

                        if (badTriangle === badTriangle2) {
                            continue;
                        } else {

                            let edges2 = [badTriangle2.a, badTriangle2.b, badTriangle2.c];

                            for (let i = 0; i < edges2.length; i++) {
                                if (edge.equals(edges2[i])) {
                                    shared = true;
                                }
                            }
                        }
                    }
                    
                    // if edge is not shared by any other triangles in badTriangles
                    if (!shared) {
                        // add edge to polygon
                        polygon.push(edge);
                    }
                }
            }

            // Remove all bad triangles from triangulation
            console.log(triangulation.filter(value => value.badTriangle));
            triangulation = triangulation.filter(value => !value.badTriangle);

            for (let edge of polygon) {
                const newTriangle = new TriangleMesh();
                newTriangle.createFromPoints(edge.A, edge.B, point);
                triangulation.push(newTriangle);
            }
        }

        const superPoints = [this.super_triangle.A, this.super_triangle.B, this.super_triangle.C];
        for (let superPoint of superPoints) {
            for (let triangle of triangulation) {
                let contains = false;
                const points = [triangle.A, triangle.B, triangle.C];

                for (let i = 0; i < points.length; i++) {
                    if (superPoint == points[i]) {
                        contains = true;
                    }
                }

                if (contains) {
                    triangle.containsFromSuper = true;
                }
            }
        }

        // Remove all that contain vertexes from super
        triangulation = triangulation.filter(value => !value.containsFromSuper);

        return triangulation;
    }
}