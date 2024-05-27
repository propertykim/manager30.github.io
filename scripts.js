let lastDeleted = null;

function checkPassword() {
    const password = document.getElementById('password').value;
    if (password === 'jaewon123') {
        document.getElementById('login-section').style.display = 'none';
        document.getElementById('admin-section').style.display = 'block';
        loadSubmissions();
    } else {
        alert('비밀번호가 틀렸습니다.');
    }
}

function loadSubmissions() {
    const submissions = JSON.parse(localStorage.getItem('submissions')) || [];
    const dataContainer = document.getElementById('submitted-data');
    dataContainer.innerHTML = '';

    if (submissions.length > 0) {
        submissions.forEach((submission, index) => {
            const submissionHTML = `
                <div class="submission">
                    <h2>신청서 #${index + 1}</h2>
                    <p><strong>이름:</strong> ${submission.name}</p>
                    <p><strong>성별/나이:</strong> ${submission.genderAge}</p>
                    <p><strong>학교(전공):</strong> ${submission.school}</p>
                    <p><strong>거주지(가장 가까운 역):</strong> ${submission.residence}</p>
                    <p><strong>사용하실 핸드폰 기종(카메라 가능):</strong> ${submission.phoneModel}</p>
                    <p><strong>자기소개(MBTI 포함 간단한 소개):</strong> ${submission.introduction}</p>
                    <p><strong>연락처:</strong> ${submission.contact}</p>
                </div>`;
            dataContainer.innerHTML += submissionHTML;
        });
    } else {
        dataContainer.innerHTML = "<p>아직 제출된 정보가 없습니다.</p>";
    }
}

function deleteLatestSubmission() {
    if (confirm("가장 최근의 사용자 정보를 삭제하시겠습니까?")) {
        let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
        lastDeleted = submissions.pop(); // 가장 최근의 정보 삭제
        localStorage.setItem('submissions', JSON.stringify(submissions));
        loadSubmissions();
    }
}

function restoreLastDeleted() {
    if (lastDeleted) {
        let submissions = JSON.parse(localStorage.getItem('submissions')) || [];
        submissions.push(lastDeleted);
        localStorage.setItem('submissions', JSON.stringify(submissions));
        lastDeleted = null;
        loadSubmissions();
    }
}
