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
    const [selected, setSelected] = useState([]);

    const onDelete = () => {
        const filteredImages = items.filter(
            (image) => !selected.includes(image.id)
        );
        setItems(filteredImages);
        setSelected([]);
    };

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
        <div className="flex min-h-screen flex-col mx-auto">
            {selected.length > 0 && (
                <div className="ml-[93%]">
                    <button
                        className="bg-[#DD230A10] py-[8px] px-[20px] rounded-[8px] text-[#DD230A] font-bold mb-[10px] ml-auto mr-0"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            )}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-4 mx-auto">
                {items.map((item, index) => {
                    const isSelected = selected.includes(item.id);
                    return (
                        <div
                            key={item.id}
                            draggable
                            onDragStart={(e) => handleDragStart(e, index)}
                            onDragOver={(e) => handleDragOver(e, index)}
                            className={`relative w-auto max-w-auto h-auto border-[1px] cursor-pointer ${
                                index === 0 && "col-span-2 row-span-2"
                            }`}
                            onClick={() => {
                                if (isSelected) {
                                    const arr = selected.filter(
                                        (img) => img !== item.id
                                    );
                                    setSelected(arr);
                                } else {
                                    setSelected([...selected, item.id]);
                                }
                            }}
                        >
                            <img
                                src={item.url}
                                alt={`Image ${index + 1}`}
                                className="w-full h-auto"
                            />
                            <div
                                className={`absolute inset-0  ${
                                    isSelected
                                        ? "opacity-50 bg-blue-500"
                                        : "opacity-0 bg-black"
                                } hover:opacity-50  transition-opacity`}
                            ></div>
                        </div>
                    );
                })}
            </div>
            {items.length === 0 && <h2 className="text-center">No Images</h2>}
        </div>
    );
};

export default DragAndDrop;
