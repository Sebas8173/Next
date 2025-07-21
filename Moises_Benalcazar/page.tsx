
import { useEffect, useState } from "react";
import { Container, Typography ,Box} from "@mui/material";

export default function MoisesHome() {
    const [datos, setDatos] = useState<any[]>([]); // Cambié el tipo a un array de cualquier cosa
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [loading1, setLoading1] = useState(null);



    fetch("http://universities.hipolabs.com/search?country=Ecuador") 
        .then((response)=>{
            if(!response.ok){
                throw new Error(`HTTP error! Status: ${response.status}`); 
            }
            return response.json();
        })
        .then((data)=>{
            setLoading1(data);
            setLoading(false);
        });

        console.log(loading1);

    // Si tenemos datos, mostrar la tabla
    return (
        <Container className="py-8">

            {loading1 && !loading && (
                <Box mt={4}>
                    <Typography variant="h4" gutterBottom>
                        Universidades por pais
                    </Typography>
                    <pre>{JSON.stringify(loading1,null,2)}</pre>
                </Box>
            )}
        </Container>
    );
}
