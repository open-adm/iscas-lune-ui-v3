import { Card, Skeleton } from "@mui/material";

interface SkeletonCardProps {
    widthCard?: string
    heightCard?: string
}

export function SkeletonCard(props: SkeletonCardProps) {
    return (
        <Card sx={{ height: props.heightCard ?? "100%", width: props.widthCard }}>
            <Skeleton
                variant="rectangular"
                height={220}
                animation="wave"
            />
        </Card>
    );
}
