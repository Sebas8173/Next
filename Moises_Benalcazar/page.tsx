"use client";;

import { useEffect, useState } from "react";
import { Container, Paper, Table, TableHead, TableRow, TableCell, TableBody, Typography } from "@mui/material";

export default function MoisesHome() {
    const [datos, setDatos] = useState<any[]>([]); // Cambié el tipo a un array de cualquier cosa
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const response = await fetch("http://localhost:8000/kevin_salazar/champion/");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const json = await response.json();
            setDatos(json.champions || []); // Asumo que 'json.champions' es el array con los datos
        } catch (err: any) {
            setError(err.message || "Error al obtener los datos");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []); // Se ejecuta solo una vez al montar el componente

    // Si estamos cargando, mostrar mensaje de carga
    if (loading) {
        return <div>Cargando...</div>;
    }

    // Si hay error, mostrar el mensaje de error
    if (error) {
        return <div>Error: {error}</div>;
    }

    // Si tenemos datos, mostrar la tabla
    return (
        <Container className="py-8">
            <Typography variant="h4" className="text-gray-800 font-semibold" gutterBottom>
                Campeones de Moisés
            </Typography>

            <Paper elevation={3} className="overflow-x-auto">
                <Table>
                    <TableHead className="bg-gray-200">
                        <TableRow>
                            <TableCell>Nombre</TableCell>
                            <TableCell>Posición</TableCell>
                            <TableCell>Región</TableCell>
                            <TableCell>Rol</TableCell>
                            <TableCell>Edad</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {datos.map((champion, index) => (
                            <TableRow key={index}>
                                <TableCell>{champion.name}</TableCell>
                                <TableCell>{champion.position}</TableCell>
                                <TableCell>{champion.region}</TableCell>
                                <TableCell>{champion.rol}</TableCell>
                                <TableCell>{champion.age}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Paper>
        </Container>
    );
}
