import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import RoundsMode  from './RoundsMode.js';
import RoundsTable from './RoundsTable.js';
import RoundForm from './RoundForm.js';
import FloatingButton from './FloatingButton.js'
import PopUpModal from './PopUpModal.js';

class RoundsPage extends React.Component {
    constructor(props) {
            super(props);
            this.state = {mode: RoundsMode.ROUNDSTABLE,
                          deleteId: -1,
                          editId: -1};        
    }

    setMode = (newMode) => {
        this.setState({mode: newMode});
    }

    initiateEditRound = (val) => {
        this.setState({editId: val,
                       mode: RoundsMode.EDITROUND}, 
                       this.props.toggleModalOpen);
    }
    
    initiateDeleteRound = (val) => {
        this.setState({deleteId: val});
    }

    completeDeleteRound = () => {
        this.props.deleteRound(this.props.rounds[this.state.deleteId]._id);
        this.setState({deleteId: -1});
    }

    cancelDeleteRound = () => {
        this.setState({deleteId: -1});
    }

    render() {
        switch (this.state.mode) {
        case RoundsMode.ROUNDSTABLE: 
            return (
                <>
                    {this.state.deleteId > -1 ? 
                            <PopUpModal
                                id={"Delete Round"}
                                text={"Press yes to delete the round, or No to cancel"}
                                choices={{Yes: this.completeDeleteRound, No: this.cancelDeleteRound}}
                            /> 
                    : null}
                    <RoundsTable rounds={this.props.rounds}
                                initiateDeleteRound={this.initiateDeleteRound}
                                deleteRound={this.props.deleteRound} 
                                deleteId={this.state.deleteId}
                                initiateEditRound= {this.initiateEditRound}
                                updateRound= {this.props.updateRound}
                                setMode={this.setMode} 
                                toggleModalOpen={this.props.toggleModalOpen}
                                menuOpen={this.props.menuOpen} /> 
                    {this.state.deleteId === -1 ? 
                    <FloatingButton
                        icon="calendar"
                        label={"Log Round"}
                        menuOpen={this.props.menuOpen}
                        action={()=>this.setState({mode: RoundsMode.LOGROUND},
                                    this.props.toggleModalOpen)} />
                    :null}
            </>
            );
        case RoundsMode.LOGROUND:
            return (
            <RoundForm mode={this.state.mode}
                    roundData={null}
                    saveRound={this.props.addRound}
                    setMode={this.setMode}
                    toggleModalOpen={this.props.toggleModalOpen} />
            );
        case RoundsMode.EDITROUND:
            return (
            <RoundForm mode={this.state.mode}
                editId = {this.state.editId}
                roundData={this.props.rounds[this.state.editId]}
                saveRound={this.props.updateRound}
                setMode={this.setMode}
                toggleModalOpen={this.props.toggleModalOpen} />
            );
        }
    }  

}

export default RoundsPage;