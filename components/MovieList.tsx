import React from "react";
import useSWR from 'swr';
import {isEmpty} from "lodash";
import MovieCard from "@/components/MovieCard";

interface MovieListProps {
    data: Record<string, any>[];
    title: string
}
const fetcher = (url: string) => fetch(url).then((res) => res.json());

const MovieList: React.FC<MovieListProps> = ({data, title}) => {
    const { data: movies, error } = useSWR('/api/movies', fetcher);

    if (error) return <div>Failed to load</div>;
    if (!movies) return <div>Loading...</div>;
    if (isEmpty(movies)) return null;

    return (
        <div className="px-4 md:px-12 mt-4 space-y-8">
            <div>
                <p className="text-white text-md md:text-xl lg:text-2xl font-semibold mb-4">
                    {title}
                </p>
                <div className="grid grid-cols-4 gap-2">
                    {data.map((movie, index) => (
                        <MovieCard key={movie.id} data={movie}/>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MovieList

