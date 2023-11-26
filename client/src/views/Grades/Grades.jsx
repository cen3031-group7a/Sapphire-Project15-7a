import React from 'react';
import './Grades.less';

const GradesComponent = ({ learningStandard }) => {
    // console.log('LS', learningStandard.expectations);
    return (
        <div id='grades-section'>
        <h1 id='grades-title'>Performance and Grades</h1>
        {learningStandard.activities ? (
            learningStandard.activities.map((activity) => (
            <div key={activity.id} className='program-section'>
                <div>{`${learningStandard.name}: Activity ${activity.number}`}</div>
                <div className='program-grade'>{activity.grade}</div>
            </div>
            ))
        ) : (
            <p>No grades available.</p>
        )}
        </div>
    );
}

export default GradesComponent;