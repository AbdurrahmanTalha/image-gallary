import { useState } from "react";

const images = [
    {
        id: "image-1",
        url: "https://i.ibb.co/M5V0TNV/image-1.webp",
    },
    {
        id: "image-2",
        url: "https://i.ibb.co/hDDtDxL/image-2.webp",
    },
    {
        id: "image-3",
        url: "https://i.ibb.co/S3HgXJf/image-3.webp",
    },
    {
        id: "image-4",
        url: "https://i.ibb.co/7YThx09/image-4.webp",
    },
    {
        id: "image-5",
        url: "https://i.ibb.co/D1Zfg90/image-5.webp",
    },
    {
        id: "image-6",
        url: "https://i.ibb.co/LPFCrMR/image-6.webp",
    },
    {
        id: "image-7",
        url: "https://i.ibb.co/vQBdmz4/image-7.webp",
    },
    {
        id: "image-8",
        url: "https://i.ibb.co/7CsQtGg/image-8.webp",
    },
    {
        id: "image-9",
        url: "https://i.ibb.co/wwBkWRf/image-9.webp",
    },
    {
        id: "image-10",
        url: "https://i.ibb.co/Ss7m7PD/image-10.jpg",
    },
    {
        id: "image-11",
        url: "https://i.ibb.co/rHSmSDr/image-11.jpg",
    },
];
const DragAndDrop = () => {
    const [draggedItem, setDraggedItem] = useState(null);
    const [items, setItems] = useState(images);

    const handleDragStart = (e, index) => {
        e.dataTransfer.setData("text/plain", index);
        setDraggedItem(index);
    };

    const handleDragOver = (e, index) => {
        e.preventDefault();

        if (index === draggedItem) {
            return;
        }

        const newItems = [...items];
        newItems.splice(draggedItem, 1);
        newItems.splice(index, 0, items[draggedItem]);
        setItems(newItems);
        setDraggedItem(index);
    };

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4">
            {items.map((item, index) => (
                <div
                    key={item.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, index)}
                    onDragOver={(e) => handleDragOver(e, index)}
                    className="w-auto max-w-[300px] h-auto border-[1px] cursor-pointer"
                >
                    <img
                        src={item.url}
                        alt={`Image ${index + 1}`}
                        className=""
                    />
                </div>
            ))}
        </div>
    );
};

export default DragAndDrop;
