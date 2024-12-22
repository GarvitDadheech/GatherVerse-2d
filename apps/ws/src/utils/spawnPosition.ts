import client from "@repo/db";

export async function getSpawnPosition(spaceId : string) {
    const spaceElements = await client.spaceElements.findMany({
        where: {
            spaceId
        },
        include: { element: true },
    });

    const isStatic = (x: number, y: number): boolean => {
        return spaceElements.some((element) => {
            const elementData = element.element;
            if (elementData.static) {
                return (
                    x >= element.x &&
                    x < element.x + elementData.width &&
                    y >= element.y &&
                    y < element.y + elementData.height
                );
            }
            return false;
        });
    };

    const space = await client.space.findUnique({
        where: {
            id: spaceId,
        },
    });

    if(!space) {
        throw new Error("Space not found");
    }

    let x, y;
    do {
        x = Math.floor(Math.random() * space.height); 
        y = Math.floor(Math.random() * space.width); 
    } while (isStatic(x, y));

    return { x, y };
    
}