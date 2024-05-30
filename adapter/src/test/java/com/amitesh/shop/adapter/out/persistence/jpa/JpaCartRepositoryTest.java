package com.amitesh.shop.adapter.out.persistence.jpa;

import com.amitesh.shop.adapter.out.persistence.AbstractCartRepositoryTest;
import org.junit.jupiter.api.Disabled;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.ActiveProfiles;

@Disabled("Need refactoring - IllegalState Unable to find a @SpringBootConfiguration, you need to use @ContextConfiguration or @SpringBootTest(classes=...)")
@SpringBootTest
@ActiveProfiles("test")
class JpaCartRepositoryTest extends AbstractCartRepositoryTest {
}
