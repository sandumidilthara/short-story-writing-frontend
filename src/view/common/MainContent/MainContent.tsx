
import {Route, Routes} from "react-router-dom";

import {Home} from "../../pages/Home/Home.tsx";

import {Contact} from "../../pages/Contact/Contact.tsx";
import {StartWritting} from "../../pages/StartWritting/StartWritting.tsx";
import {CategorizeStories} from "../../pages/CategorizeStories/CategorizeStories.tsx";
import {StoryDetail} from "../../pages/StoryDetail/StoryDetail.tsx";





export function MainContent() {
    return (
        <div className="bg-stone-100 p-8 flex items-center justify-center text-center text-3xl min-h-96">
            <Routes>
                <Route path="/" element={<Home />}/>
                {/*<Route path="/seeStories" element={<SeeStories />}/>*/}
                <Route path="/startWriting" element={<StartWritting />}/>
                <Route path="/contact" element={<Contact />}/>
                <Route path="/category/:categoryName" element={<CategorizeStories />} />
                <Route path="/story/:storyId" element={<StoryDetail />} />


            </Routes>
        </div>
    );
}