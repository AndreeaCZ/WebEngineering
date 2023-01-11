import React from 'react'

export default function Report() {
    return(
        <div> 
            <h3>Web Engineering Project Report (Group 25)</h3>
                
                <h5>Efforts on project</h5>
                <p>At first we attempted to build the back-end using the Django framework and MongoDB.
                However, we encountered multiple issues getting the connection to MongoDB working.
                Therefore, after doing some research, we decided on using MERN stack(MongoDB, Express.js, React.js, Node.js) for our project.<br/>
                The back-end was handled by Express.js and Node.js.<br/>
                The front-end was handled by React.js.<br/>
                The database was handled by MongoDB(Atlas).<br/>
                </p>

                <h5>Milestones</h5>
                <p>
                The first milestone(API Design) was achieved fairly quickly.<br/>
                After having made our API we started working on the second milestone(API implementation).<br/>
                At this point, we realised that we needed to adjust our specification a bit to better reflect our implementation.<br/>
                Finally, we worked on the third milestone(User interface and project report), which proved relatively easy to implement after having built a solid back-end.<br/>
                To finish the project, we deployed our web app combined with our written report.
                </p>

                <h5>Distribution of Work</h5>
                <p>
                For the majority of the work we used an extension found on the IDE (Visual Studio Code) which all of us were using, called “Visual Studio Live Share”. <br/>
                This allowed all group members to connect to a single session where we would see live updates on the changes made to the code. This made teamwork much easier, since all group members could look at the same code simultaneously. <br/>
                Regarding splitting the work, we all worked on the same parts due to the layout of the project. (All worked on the API then we all worked on the backend etc). 
                </p>
        </div>    
    );
}