import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import BoldText from '../../../../../CustomText/BoldText';
import theme from '../../../../../../utils/theme';
import { actions } from '../../../../../../redux/ducks';

const Pagination = () => {
  const dispatch = useDispatch();
  const dispatchPagination = (number, type) => dispatch(actions.changePagination(number, type));
  const pullMatchHistory = (accountId, beginIndex, endIndex) => dispatch(actions.pullMatchHistory(accountId, beginIndex, endIndex));
  const resetMatchesChampionsData = (type) => dispatch(actions.resetChampionsData(type));
  const pagination = useSelector(state => state.pagination);
  const summonerInfo = useSelector(state => state.summonerInfo);

  const changePagination = async (number, type) => {
    resetMatchesChampionsData('matches');
    dispatchPagination(number, type);
  };

  const goLeft = () => {
    if (pagination.firstPage !== pagination.currentPage) {
      changePagination(0, 'left');
    }
  }

  const disableLeft = () => {
    if (pagination.firstPage === pagination.currentPage) {
      return true;
    } else {
      return false;
    }
  }

  const goRight = () => {
    if (pagination.lastPage !== pagination.currentPage) {
      changePagination(0, 'right');
    }
  }

  const disableRight = () => {
    if (pagination.lastPage === pagination.currentPage) {
      return true;
    } else {
      return false;
    }
  }

  const goFirst = () => {
    changePagination(0, 'first');
  }

  const goLast = () => {
    changePagination(0, 'last');
  }

  const goIndex = number => {
    changePagination(number, 'index');
  }

  const disableIndex = number => {
    if (number === pagination.currentPage) {
      return true;
    } else {
      return false;
    }
  }

  const renderPagination = () => {
    if (pagination.currentPage > 3 && pagination.currentPage < pagination.lastPage - 2) {
      return (
        <>
          <BoldText text='...' />
          <TouchableOpacity style={styles.paginationItem} onPress={() => goIndex(pagination.currentPage - 2)}>
            <BoldText text={pagination.currentPage - 2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paginationItem} onPress={() => goIndex(pagination.currentPage - 1)}>
            <BoldText text={pagination.currentPage - 1} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paginationItem} disable={true}>
            <BoldText text={pagination.currentPage} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paginationItem} onPress={() => goIndex(pagination.currentPage + 1)}>
            <BoldText text={pagination.currentPage + 1} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paginationItem} onPress={() => goIndex(pagination.currentPage + 2)}>
            <BoldText text={pagination.currentPage + 2} />
          </TouchableOpacity>
          <BoldText text='...' />
        </>
      )
    } else if (pagination.currentPage < 4) {
      return (
        <>
          <TouchableOpacity style={styles.paginationItem} disabled={disableIndex(2)} onPress={() => goIndex(2)}>
            <BoldText text={2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paginationItem} disabled={disableIndex(3)} onPress={() => goIndex(3)}>
            <BoldText text={3} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paginationItem} disabled={disableIndex(4)} onPress={() => goIndex(4)}>
            <BoldText text={4} />
          </TouchableOpacity>
          <BoldText text='...' />
        </>
      )
    } else {
      return (
        <>
          <BoldText text='...' />
          <TouchableOpacity style={styles.paginationItem} disabled={disableIndex(pagination.lastPage - 3)} onPress={() => goIndex(pagination.lastPage - 3)}>
            <BoldText text={pagination.lastPage - 3} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paginationItem} disabled={disableIndex(pagination.lastPage - 2)} onPress={() => goIndex(pagination.lastPage - 2)}>
            <BoldText text={pagination.lastPage - 2} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.paginationItem} disabled={disableIndex(pagination.lastPage - 1)} onPress={() => goIndex(pagination.lastPage - 1)}>
            <BoldText text={pagination.lastPage - 1} />
          </TouchableOpacity>
        </>
      )
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.paginationContainer}>
        <TouchableOpacity style={styles.paginationItem} disabled={disableLeft()} onPress={goLeft}>
          <BoldText text='<' />
        </TouchableOpacity>
        <TouchableOpacity style={styles.paginationItem} disabled={disableLeft()} onPress={goFirst}>
          <BoldText text='1' />
        </TouchableOpacity>
        {
          renderPagination()
        }
        <TouchableOpacity style={styles.paginationItem} disabled={disableRight()} onPress={goLast}>
          <BoldText text={pagination.lastPage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.paginationItem} disabled={disableRight()} onPress={goRight}>
          <BoldText text='>' />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //width: '100%',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center'
  },
  paginationContainer: {
    flex: 1,
    //width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  paginationItem: {
    margin: 4,
    padding: 4,
    backgroundColor: theme.colors.dividerColor,
    borderRadius: 4
  }
});

export default Pagination;