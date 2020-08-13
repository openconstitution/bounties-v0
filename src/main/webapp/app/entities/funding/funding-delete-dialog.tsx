import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router-dom';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from './funding.reducer';

export interface IFundingDeleteDialogProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export const FundingDeleteDialog = (props: IFundingDeleteDialogProps) => {
  useEffect(() => {
    props.getEntity(props.match.params.id);
  }, []);

  const handleClose = () => {
    props.history.push('/funding');
  };

  useEffect(() => {
    if (props.updateSuccess) {
      handleClose();
    }
  }, [props.updateSuccess]);

  const confirmDelete = () => {
    props.deleteEntity(props.fundingEntity.id);
  };

  const { fundingEntity } = props;
  return (
    <Modal isOpen toggle={handleClose}>
      <ModalHeader toggle={handleClose}>
        Confirm delete operation
      </ModalHeader>
      <ModalBody id="bountiesApp.funding.delete.question">
        {/* <Translate contentKey="bountiesApp.funding.delete.question" interpolate={{ id: fundingEntity.id }}> */}
          Are you sure you want to delete this Funding?
      </ModalBody>
      <ModalFooter>
        <Button color="secondary" onClick={handleClose}>
          <FontAwesomeIcon icon="ban" />
          &nbsp;
          Cancel
        </Button>
        <Button id="jhi-confirm-delete-funding" color="danger" onClick={confirmDelete}>
          <FontAwesomeIcon icon="trash" />
          &nbsp;
          Delete
        </Button>
      </ModalFooter>
    </Modal>
  );
};

const mapStateToProps = ({ funding }: IRootState) => ({
  fundingEntity: funding.entity,
  updateSuccess: funding.updateSuccess,
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(mapStateToProps, mapDispatchToProps)(FundingDeleteDialog);
