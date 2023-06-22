const { Polygon, PolygonPoints, Location, W_one, Zer0, Zer1, Zer2, Zer3, Zer4,
    Zer5, Zer6, Zer7} = require("../db");
const getPolygon = require("./getPolygon")    ;


const probabilities = async (location, periodo)=>{
    let coordinates_data;
    let coordinates = [];
    let polygons_data;
    let polygons = [];
    let zer_data;
    let sum;
    let result = [];
	let X = [];
	let Y_y = [];
	let Y_z = [];
	let Y_mc = [];
	let Y_ab = [];
	let Y_bc = [];

    try{
        //find in the location table, the location sent by parameter
        const location_data = await Location.findByPk(location);
        
        if(!location_data) throw new Error("location not found");

        //get longitude and latitude from location response
        const latitude = location_data.latitude;
        const longitude = location_data.longitude;

        //find in the PolygonPoints table, all result with type 1
        coordinates_data = await PolygonPoints.findAll({where:{type: 1}});

        if(!coordinates_data) throw new Error("coordinates not found");

        //load the response information to the coordinates variable
        for (const coord of coordinates_data) {
            coordinates.push(coord.latitude,coord.longitude);
        };

        //find in the Poligon table, all result with type 1
        polygons_data = await Polygon.findAll({where:{type: 1}});

        if(!polygons_data) throw new Error("polygons not found");

        //load the response information to the polygons variable(separating by |)
        for (const pol of polygons_data) {
            polygons.push(pol.point.split("|"));
        };

        //a polygon is obtained with the result of the execution of the getPolygon function
        const polygon = getPolygon(latitude,longitude, polygons, coordinates);

        if(polygon === -1) throw new Error("polygon not found");

        //find all ponderations data and load to array ponderations
        const ponderations_data = W_one.findAll();

        let ponderations = [];

        for (const pond of ponderations_data) {
            ponderations.push(  pond.Y_y,
                                pond.Y_z,
                                pond.Y_mc,
                                pond.Y_ab,
                                pond.Y_bc);
        };
        //find in the PolygonPoints table, all result with type 1
        coordinates_data = await PolygonPoints.findAll({where:{type: 4}});

        if(!coordinates_data) throw new Error("coordinates not found");

        //load the response information to the coordinates variable
        coordinates = []
        for (const coord of coordinates_data) {
            coordinates.push(coord.latitude,coord.longitude);
        };

        //find in the Poligon table, all result with type 1
        polygons_data = await Polygon.findAll({where:{type: 4}});

        if(!polygons_data) throw new Error("polygons not found");

        //load the response information to the polygons variable(separating by |)
        polygons = [];
        for (const pol of polygons_data) {
            polygons.push(pol.point.split("|"));
        };

        //a polygon is obtained with the result of the execution of the getPolygon function
        const polygon2 = await getPolygon(latitude,longitude,polygons, coordinates);

        if(polygon2 === -1) throw new Error("polygon not found");
        
        //from the polygon result obtained in polygon 2, a table is searched to reduce the search time
        switch(polygon2){
            case 0: zer_data = await Zer0.findAll({where: {id:location, Periodo: periodo}})
                    break;
            case 1: zer_data = await Zer1.findAll({where: {id:location, Periodo: periodo}})
                break;
            case 2: zer_data = await Zer2.findAll({where: {id:location, Periodo: periodo}})
                break;
            case 3: zer_data = await Zer3.findAll({where: {id:location, Periodo: periodo}})
                break;
            case 4: zer_data = await Zer4.findAll({where: {id:location, Periodo: periodo}})
                break;
            case 5: zer_data = await Zer5.findAll({where: {id:location, Periodo: periodo}})
                break;
            case 6: zer_data = await Zer6.findAll({where: {id:location, Periodo: periodo}})
                break;
            case 7: zer_data = await Zer7.findAll({where: {id:location, Periodo: periodo}})
                break;
            default: throw new Error("polygon is out of parameters");
        }

        if(!zer_data) throw new Error("information not found");
        
        //load all the information of the response in their respective arrays
        for (const data of zer_data) {
                X.push(data.X)
                Y_y.push(data.Y_y)
                Y_z.push(data.Y_z)
                Y_mc.push(data.Y_mc)
                Y_ab.push(data.Y_ab)
                Y_bc.push(data.Y_bc)
        }

        //perform the necessary calculations to obtain the required result
        for (let i = 0; i < 20; i++){
            sum = ponderations[polygon][0]* Y_y[i] + ponderations[polygon][1]* Y_z[i] + 
                ponderations[polygon][2]* Y_mc[i] + ponderations[polygon][3]* Y_ab[i] +
                ponderations[polygon][4]* Y_bc[i];
            sum = sum.toFixed(8);
            result.push({ x: X[i] / 981, y: sum })
            
        }
        
        return result
    }catch(error){
        return error;
    }
};

module.exports = probabilities;