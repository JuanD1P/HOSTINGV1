import mysql from 'mysql';

const con = mysql.createConnection({
    host: "bu6jbvjaxxyqktkso4xa-mysql.services.clever-cloud.com",
    user: "uluh5prz37ftttcf",
    password: "6BMGCwr0DKFUmX9Ra8uz",
    database: "bu6jbvjaxxyqktkso4xa",
    port: 3306
});

con.connect((err) => {
    if (err) {
        console.log("❌ Conexión errónea:", err);
    } else {
        console.log("✅ Conexión exitosa a la base de datos");
    }
});

export default con;
