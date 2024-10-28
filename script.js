const whiteKeys = document.querySelectorAll('.white-key');
const blackKeys = document.querySelectorAll('.black-key');

let isMouseDown = false;

// 마우스 버튼을 눌렀을 때
document.addEventListener('mousedown', () => {
    isMouseDown = true;
});

// 마우스 버튼을 떼었을 때
document.addEventListener('mouseup', () => {
    isMouseDown = false;
    // 모든 흰 건반의 필터 복원
    resetWhiteKeyFilter();
});

// 마우스 이동 이벤트 추가
document.addEventListener('mousemove', (event) => {
    if (isMouseDown) {
        const target = document.elementFromPoint(event.clientX, event.clientY);
        if (target && target.classList.contains('white-key')) {
            const sound = target.dataset.sound;
            playSound(sound);
            // 클릭된 건반에 보라색 필터 적용
            applyKeyFilter(target, true);
        }
    }
});

// 모든 건반에 클릭 이벤트 추가
const addKeyClickListener = (key) => {
    key.addEventListener('mousedown', () => {
        const sound = key.dataset.sound;
        playSound(sound); // 사운드 재생 함수 호출
        // 클릭된 건반에 보라색 필터 적용
        applyKeyFilter(key, true);
    });

    // 마우스가 건반에서 떠났을 때
    key.addEventListener('mouseleave', () => {
        resetKeyFilter(key);
    });
};

whiteKeys.forEach(addKeyClickListener);
blackKeys.forEach(addKeyClickListener);

// 이미지 드래그 방지
whiteKeys.forEach(key => {
    key.addEventListener('dragstart', (event) => {
        event.preventDefault(); // 기본 드래그 동작 방지
    });
});

blackKeys.forEach(key => {
    key.addEventListener('dragstart', (event) => {
        event.preventDefault(); // 기본 드래그 동작 방지
    });
});

// 사운드 재생 함수
function playSound(soundFile) {
    const audio = new Audio(soundFile);
    audio.play();
}

// 클릭된 건반에 보라색 필터를 적용하는 함수
function applyKeyFilter(key, isActive) {
    if (isActive) {
        key.style.filter = 'brightness(0) saturate(100%) invert(25%) sepia(100%) saturate(500%) hue-rotate(230deg) brightness(100%)';
    }
}

// 모든 흰 건반의 필터를 원래대로 돌리는 함수
function resetWhiteKeyFilter() {
    whiteKeys.forEach(key => {
        key.style.filter = 'none'; // 필터 복원
    });
}

// 개별 건반 필터 복원 함수
function resetKeyFilter(key) {
    key.style.filter = 'none'; // 필터 복원
}
