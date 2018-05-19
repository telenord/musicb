import React, {Component} from 'react';
import {Mutation} from 'react-apollo';
import likeLyric from '../queries/likeLyric';

class LyricList extends Component {
    renderLyrics() {
        const {lyrics} = this.props;
        if (lyrics) {
            return lyrics.map(({content, id, likes}) => (
                <li className='collection-item' key={id}>
                    {content}
                    <div className="vote-box right">
                        <Mutation
                            mutation={likeLyric} key={id}
                        >
                            {(likeLyric) => (
                                <i className='material-icons right'
                                   onClick={() => likeLyric({variables: {id, likes: ++likes}})}>thumb_up</i>
                            )}
                        </Mutation>
                        <span className="">{likes}</span>
                    </div>
                </li>
            ));
        }
    }

    render() {
        return (
            <ul className='collection'>
                {this.renderLyrics()}
            </ul>
        )
    }
}

export default LyricList;