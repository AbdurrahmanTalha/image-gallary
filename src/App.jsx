import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import "./App.css";

function App() {
    const gallery = Object.values(
        import.meta.glob("./assets/images/*", {
            eager: true,
            as: "url",
        })
    ).map((url, index) => ({ id: `image-${index + 1}`, url }));

    const [galleries, setGalleries] = useState(gallery);
    const [selected, setSelected] = useState([]);
    const handleOnDragEnd = (result) => {
        const items = Array.from(galleries);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        setGalleries(items);
    };

    const deleteImages = () => {
        const updatedSelected = galleries.filter((selectedItem) => {
            return !selected.some(
                (galleryItem) => galleryItem === selectedItem.id
            );
        });
        setGalleries(updatedSelected);
    };

    return (
        <div className="p-[30px]">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                {gallery && (
                    <div>
                        <Droppable droppableId="images">
                            {(provided) => (
                                <div
                                    className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {galleries.map(({ id, url }, index) => {
                                        const isSelected =
                                            selected.includes(id);
                                        return (
                                            <Draggable
                                                key={id}
                                                draggableId={id}
                                                index={index}
                                            >
                                                {(draggableProvided) => (
                                                    <div
                                                        ref={
                                                            draggableProvided.innerRef
                                                        }
                                                        {...draggableProvided.draggableProps}
                                                        {...draggableProvided.dragHandleProps}
                                                    >
                                                        <img
                                                            src={url}
                                                            className={`w-full h-auto border-[1px] ${
                                                                isSelected &&
                                                                "border-[#e11818]"
                                                            }`}
                                                            alt={`Image ${id}`}
                                                            onClick={() => {
                                                                if (
                                                                    !isSelected
                                                                ) {
                                                                    setSelected(
                                                                        [
                                                                            ...selected,
                                                                            id,
                                                                        ]
                                                                    );
                                                                } else {
                                                                    const newArray =
                                                                        selected.filter(
                                                                            (
                                                                                item
                                                                            ) =>
                                                                                item !==
                                                                                id
                                                                        );
                                                                    setSelected(
                                                                        newArray
                                                                    );
                                                                }
                                                            }}
                                                        />
                                                    </div>
                                                )}
                                            </Draggable>
                                        );
                                    })}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                )}
                <button
                    onClick={deleteImages}
                    className="bg-red-600 text-white rounded-md px-[10px] py-[5px] mt-[10px]"
                >
                    Delete!
                </button>
            </DragDropContext>
        </div>
    );
}

export default App;
