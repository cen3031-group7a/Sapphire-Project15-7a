import React from 'react';
import './Grades.less';

const GradesComponent = ({ learningStandard }) => {

    // console.log('LS', learningStandard.expectations);
    return (
        <div id='grades-section'>
        <h1 id='grades-title'>Performance and Grades</h1>
        <div className='program-section'>
            <div className='program-name' style={{marginBottom: '3%'}}> <b>Activity</b> </div>
            <div className='program-grade' style={{marginBottom: '3%'}}> <b>Grade</b> </div>
        </div>
        {learningStandard.activities ? (
            learningStandard.activities.map((activity) => (
            <div key={activity.id} className='program-section'>
                <div className='program-name'>{`${learningStandard.name}: Activity ${activity.number}`}</div>
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